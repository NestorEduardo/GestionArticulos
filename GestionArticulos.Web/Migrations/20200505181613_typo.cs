using Microsoft.EntityFrameworkCore.Migrations;

namespace GestionArticulos.Web.Migrations
{
    public partial class typo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MovementypeId",
                table: "Movements",
                newName: "MovemenTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MovemenTypeId",
                table: "Movements",
                newName: "MovementypeId");
        }
    }
}
