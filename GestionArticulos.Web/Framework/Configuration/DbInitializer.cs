using GestionArticulos.Core.Domain;
using GestionArticulosData;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;

namespace GestionArticulos.Web.Framework.Configuration
{
    public class DbInitializer
    {
        public static void Seed(ApplicationDbContext database)
        {


            if (!database.Provinces.Any())
            {
                Province province1 = new Province
                {
                    Description = "Santo Domingo"
                };

                Province province2 = new Province
                {
                    Description = "San Cristóbal"
                };

                database.Provinces.Add(province1);
                database.Provinces.Add(province2);
                database.SaveChanges();

                Municipality municipality1 = new Municipality
                {
                    Description = "Distrito Nacional",
                    ProvinceId = province1.Id
                };

                Municipality municipality2 = new Municipality
                {
                    Description = "Santo Domingo Este",
                    ProvinceId = province1.Id
                };

                Municipality municipality3 = new Municipality
                {
                    Description = "Santo Domingo Norte",
                    ProvinceId = province1.Id
                };

                Municipality municipality4 = new Municipality
                {
                    Description = "Santo Domingo Oeste",
                    ProvinceId = province1.Id
                };

                database.Municipalities.Add(municipality1);
                database.Municipalities.Add(municipality2);
                database.Municipalities.Add(municipality3);
                database.Municipalities.Add(municipality4);

                database.SaveChanges();

                Neighborhood neighborhood1 = new Neighborhood
                {
                    Description = "Invivienda",
                    MunicipalityId = municipality2.Id
                };

                Neighborhood neighborhood2 = new Neighborhood
                {
                    Description = "Alma Rosa",
                    MunicipalityId = municipality2.Id
                };

                Neighborhood neighborhood3 = new Neighborhood
                {
                    Description = "Naco",
                    MunicipalityId = municipality1.Id
                };

                Neighborhood neighborhood4 = new Neighborhood
                {
                    Description = "Piantini",
                    MunicipalityId = municipality1.Id
                };

                database.Neighborhoods.Add(neighborhood1);
                database.Neighborhoods.Add(neighborhood2);
                database.Neighborhoods.Add(neighborhood3);
                database.Neighborhoods.Add(neighborhood4);
                database.SaveChanges();

                MovementType movementType1 = new MovementType
                {
                    Description = "SALIDA"
                };

                MovementType movementType2 = new MovementType
                {
                    Description = "ENTRADA"
                };

                database.MovementTypes.Add(movementType1);
                database.MovementTypes.Add(movementType2);
                database.SaveChanges();
            }

        }
    }
}
