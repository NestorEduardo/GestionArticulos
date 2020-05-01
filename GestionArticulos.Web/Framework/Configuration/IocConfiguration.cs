using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GestionArticulos.Web.Framework.Configuration
{
    public static class IocConfiguration
    {
        //public static void Init(IConfiguration configuration, IServiceCollection services)
        //{
        //    services.AddScoped<Ap, EmpleaDbContext>();

        //    services.Scan(x => x.FromAssemblyOf<EmpleaDbContext>()
        //        .AddClasses()
        //        .UsingRegistrationStrategy(RegistrationStrategy.Skip)
        //        .AsMatchingInterface()
        //        .WithScopedLifetime());


        //    services.Scan(x => x.FromAssemblyOf<IJobsService>()
        //        .AddClasses()
        //        .UsingRegistrationStrategy(RegistrationStrategy.Skip)
        //        .AsMatchingInterface()
        //        .WithScopedLifetime());


        //}
    }
}
