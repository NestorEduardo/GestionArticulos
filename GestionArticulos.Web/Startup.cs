using GestionArticulosData;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using GestionArticulos.Services.Abstract;
using GestionArticulos.Services.Implementations;
using GestionArticulos.Repository.Abstract;
using GestionArticulos.Repository.Implementations;

namespace GestionArticulos.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<IWarehouseService, WarehouseService>();
            services.AddTransient<IProvinceService, ProvinceService>();
            services.AddTransient<IMunicipalityService, MunicipalityService>();
            services.AddTransient<INeighborhoodService, NeighborhoodService>();
            services.AddTransient<IWarehouseRepository, WarehouseRepository>();
            services.AddTransient<IProvinceRepository, ProvinceRepository>();
            services.AddTransient<IMunicipalityRepository, MunicipalityRepository>();
            services.AddTransient<INeighborhoodRepository, NeighborhoodRepository>();
            services.AddControllersWithViews();
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            string dbConnString = Configuration["Data:GestionArticulos:ConnectionString"];

            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(dbConnString, builder => builder.MigrationsAssembly(typeof(Startup).Assembly.FullName)));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
