using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Domain;

namespace Persistence;

public class Seed
{
    public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
    {

        if(!userManager.Users.Any())
        {
            var users = new List<AppUser>
            {
                new AppUser{
                    DisplayName="Bob",
                    UserName = "bob",
                    Email = "bob@test.com"
                },
                new AppUser{
                    DisplayName="Kyri",
                    UserName = "kyri",
                    Email = "kyri@test.com"
                },
                new AppUser{
                    DisplayName="Krissi",
                    UserName = "krissi",
                    Email = "krissi@test.com"
                },
            };

            foreach(AppUser user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }

        if(context.WatchList.Any()) return;

        var watchdata = new List<WatchList>
        {
            new WatchList
            {
                User = "Dan",
                PriceWhenWatched = "1000",
                CryptoSymbol = "ETH",
                DateWatched = "2022-11-01"
            },
            new WatchList
            {
                User = "Dan",
                PriceWhenWatched = "20000",
                CryptoSymbol = "BTC",
                DateWatched = "2022-11-01"
            },
            new WatchList
            {
                User = "Kyri",
                PriceWhenWatched = "100",
                CryptoSymbol = "DOT",
                DateWatched = "2022-10-21"
            }
        };

        await context.WatchList.AddRangeAsync(watchdata);
        await context.SaveChangesAsync();
    }
}
