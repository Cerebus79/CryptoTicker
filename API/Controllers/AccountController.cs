using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[AllowAnonymous]
[ApiController]
[Route("/api/[controller]")]
public class AccountController : ControllerBase
{
    private DataContext _context;
    private UserManager<AppUser> _usermanager;
    private SignInManager<AppUser> _signInManager;
    private TokenService _tokenService;

    public AccountController(DataContext context, 
    UserManager<AppUser> usermanager, SignInManager<AppUser> signInManager, 
    TokenService tokenService)
    {
        _context = context;
        _usermanager = usermanager;
        _signInManager = signInManager;
        _tokenService= tokenService;

    }

    [Authorize]
    [HttpGet("watchlist/{id}")]
    public async Task<ActionResult<WatchList>> GetWatchList(Guid id)
    {
        var result = await _context.WatchList.FindAsync(id);

        return result!;

        //return await _context.WatchList.ToListAsync<WatchList>();

    }

    [HttpGet("test")]
    public async Task<ActionResult<string>> Test()
    {
        var result = "I'm a test response";

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
            return CreateUserDTO(user);
        }

        return Unauthorized();
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>>Register(RegisterDto regDto)
    {
        if( await _usermanager.Users.AnyAsync((reg)=> reg.Email == regDto.Email )) 
                return Unauthorized("Email taken");

        if( await _usermanager.Users.AnyAsync((reg)=> reg.UserName == regDto.Username )) 
                return Unauthorized("Username taken");

        AppUser user = new AppUser
        {
            Email = regDto.Email,
            UserName = regDto.Username,
            DisplayName = regDto.DisplayName
        };

        var result = await _usermanager.CreateAsync(user, regDto.Password);

        if(result.Succeeded)
        {
            return CreateUserDTO(user);
        }

        return BadRequest("Problem registering user");
    }

    private UserDto CreateUserDTO(AppUser user)
    {
            return new UserDto{
                DisplayName = user.DisplayName,
                Token = _tokenService.CreateToken(user),
                Username = user.UserName,
                Image = null
            };
    }
}
