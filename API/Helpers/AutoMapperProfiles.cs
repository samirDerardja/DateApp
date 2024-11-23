using System;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;
using static API.Entities.AppUser;

namespace API.Helpers;

public class AutoMapperProfiles: Profile
{
    public AutoMapperProfiles() {
        CreateMap<AppUser,MemberDto>()
        .ForMember(o => o.Age, o => o.MapFrom(d => d.DateOfBirth.CalculOfAge()))
        .ForMember(d => d.PhotoUrl, 
        o=> o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain)!.Url));
        CreateMap<Photo,PhotoDto>();
    }
}
