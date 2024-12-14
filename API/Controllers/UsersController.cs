using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static API.Entities.AppUser;


namespace API.Controllers
{
    [Authorize]
    public class UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService) : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await userRepository.GetMembersAsync();

            return Ok(users);
        }

        [HttpGet("{username}")] // /api/users/1
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var user = await userRepository.GetMemberAsync(username);

            if (user == null) return NotFound();

            return user;
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberEditDto memberEditDto)
        {

            var user = await userRepository.GetUserByUsernameAsync(User.GetUserName());
            if (user == null) return BadRequest("Utilisateur non trouvé");
            mapper.Map(memberEditDto, user);

            if (await userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Erreur lors de la mise à jour");

        }

        [HttpPost("Add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            var user = await userRepository.GetUserByUsernameAsync(User.GetUserName());
            if (user == null) return BadRequest("Utilisateur non trouvé");

            var result = await photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            user.Photos.Add(photo);
            if (await userRepository.SaveAllAsync()) 
            return CreatedAtAction(nameof(GetUser), 
            new {username = user.UserName}, mapper.Map<PhotoDto>(photo));
            return BadRequest("Problème lors de l' ajout de photo");

        }

        [HttpPut("set-main-photo/{photoId:int}")]

         public async Task<ActionResult> SetMainPhoto(int photoId)
         {
            var user = await userRepository.GetUserByUsernameAsync(User.GetUserName());
            if(user == null) return BadRequest("Utilisateur inexistant");
            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);
            if(photo == null || photo.IsMain) return BadRequest("Vous ne pouvez pas selectionner cette photo");

            var currentMain = user.Photos.FirstOrDefault(x => x.IsMain );

            if(currentMain != null) currentMain.IsMain = false;

            photo.IsMain = true;

            if (await userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("il un problème dans les paramètre de la photo principale");
         }

         [HttpDelete("delete-photo/{photoId}")]

         public async Task<ActionResult> DeletePhoto(int photoId) {
                  var user = await userRepository.GetUserByUsernameAsync(User.GetUserName());
                   if(user == null) return BadRequest("Utilisateur inexistant");
                   var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);
             if(photo == null || photo.IsMain) return BadRequest("Vous ne pouvez pas supprimer cette photo");
             if(photo.PublicId != null ) {
                var result = await photoService.DeletePhotoAsync(photo.PublicId);
                if(result.Error != null) return BadRequest(result.Error.Message);
             }

             user.Photos.Remove(photo);
            if (await userRepository.SaveAllAsync()) return Ok();

            return BadRequest("il un problème lors de la suppression de la photo");

         }
    }
}
