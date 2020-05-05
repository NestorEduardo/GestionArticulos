using Microsoft.EntityFrameworkCore.Migrations;

namespace GestionArticulos.Web.Migrations
{
    public partial class t : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Movements_MovementTypes_MovementTypeId",
                table: "Movements");

            migrationBuilder.DropColumn(
                name: "MovemenTypeId",
                table: "Movements");

            migrationBuilder.AlterColumn<int>(
                name: "MovementTypeId",
                table: "Movements",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Movements_MovementTypes_MovementTypeId",
                table: "Movements",
                column: "MovementTypeId",
                principalTable: "MovementTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Movements_MovementTypes_MovementTypeId",
                table: "Movements");

            migrationBuilder.AlterColumn<int>(
                name: "MovementTypeId",
                table: "Movements",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "MovemenTypeId",
                table: "Movements",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Movements_MovementTypes_MovementTypeId",
                table: "Movements",
                column: "MovementTypeId",
                principalTable: "MovementTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
