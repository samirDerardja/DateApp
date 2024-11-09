using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class LoginDto
{
    [Required]
    [MaxLength(100)]
    public required string Username { get; set; }
    public required string Password { get; set; }
}

