using System.Linq;
using System.Threading.Tasks;
using GestionArticulos.Core.Domain;
using GestionArticulos.Repository.Abstract;
using GestionArticulosData;

namespace GestionArticulos.Repository.Implementations
{
    public class MovementRepository : BaseRepository<Movement>, IMovementRepository
    {
        private readonly ApplicationDbContext database;
        public MovementRepository(ApplicationDbContext database) : base(database) => this.database = database;

        public async Task<int> AddMovement(string description, Movement movement)
        {
            MovementType movementType = database.MovementTypes.Where(mt => mt.Description == description).FirstOrDefault();

            database.Movements.Add(new Movement
            {
                MovementTypeId = movementType.Id,
                ProductId = movement.ProductId,
                WarehouseId = movement.WarehouseId,
                Count = movement.Count
            });

            return await database.SaveChangesAsync();

        }
    }
}
