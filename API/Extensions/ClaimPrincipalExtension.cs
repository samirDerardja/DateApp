using System;
using System.Security.Claims;

namespace API.Extensions;

public static class ClaimPrincipalExtension
{
     public static string GetUserName(this ClaimsPrincipal user)
     
      { 
        var username = user.FindFirstValue(ClaimTypes.NameIdentifier)
        ?? throw new Exception("L' utilisateur n' est pas recupérable");

        return username; 

    }
}
