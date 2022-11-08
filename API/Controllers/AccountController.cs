using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class AccountController : ControllerBase
{
    private DataContext _context;

    public AccountController(DataContext context)
    {
        _context = context;
    }

    [HttpGet("watchlist/{id}")]
    public async Task<ActionResult<WatchList>> GetWatchList(Guid id)
    {
        var result = await _context.WatchList.FindAsync(id);

        return result!;

        //return await _context.WatchList.ToListAsync<WatchList>();

    }
}
