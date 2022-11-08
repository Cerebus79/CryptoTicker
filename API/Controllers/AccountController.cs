using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class AccountController : ControllerBase
{
    private DataContext _context;
    private UserManager<AppUser> _usermanager;
    private SignInManager<AppUser> _signInManager;

    public AccountController(DataContext context, 
    UserManager<AppUser> usermanager, SignInManager<AppUser> signInManager)
    {
        _context = context;
        _usermanager = usermanager;
        _signInManager = signInManager;
    }

    [HttpGet("watchlist/{id}")]
    public async Task<ActionResult<WatchList>> GetWatchList(Guid id)
    {
        var result = await _context.WatchList.FindAsync(id);

        return result!;

        //return await _context.WatchList.ToListAsync<WatchList>();

    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>>Login(LoginDto loginDto)
    {
        var user = await _usermanager.FindByEmailAsync(loginDto.Email);

        if(user == null) return Unauthorized();

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

        if(result.Succeeded)
        {
            return new UserDto{
                DisplayName = user.DisplayName,
                Token = "this will be a token",
                Username = user.UserName,
                Image = null
            };
        }

        return Unauthorized();
    }
}
