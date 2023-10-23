using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookKeeping.API.Migrations
{
    /// <inheritdoc />
    public partial class DatabaseaddedtoDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "IncomeOrExpenses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IncomeOrExpenseTypeId = table.Column<int>(type: "int", nullable: false),
                    YearMonth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IncomeOrExpenses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "IncomeOrExpenseTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IncomeOrExpenseTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Bookkeepings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    YearMonth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IncomeOrExpenseTypeId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bookkeepings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Bookkeepings_IncomeOrExpenseTypes_IncomeOrExpenseTypeId",
                        column: x => x.IncomeOrExpenseTypeId,
                        principalTable: "IncomeOrExpenseTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bookkeepings_IncomeOrExpenseTypeId",
                table: "Bookkeepings",
                column: "IncomeOrExpenseTypeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Bookkeepings");

            migrationBuilder.DropTable(
                name: "IncomeOrExpenses");

            migrationBuilder.DropTable(
                name: "IncomeOrExpenseTypes");
        }
    }
}
