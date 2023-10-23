﻿// <auto-generated />
using System;
using BookKeeping.API.Data.Access;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BookKeeping.API.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.12")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("BookKeeping.API.Models.Bookkeeping", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<decimal?>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("IncomeOrExpenseTypeId")
                        .HasColumnType("int");

                    b.Property<DateTime>("YearMonth")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("IncomeOrExpenseTypeId");

                    b.ToTable("Bookkeepings");
                });

            modelBuilder.Entity("BookKeeping.API.Models.IncomeOrExpense", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<decimal?>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("IncomeOrExpenseTypeId")
                        .HasColumnType("int");

                    b.Property<DateTime>("YearMonth")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("IncomeOrExpenses");
                });

            modelBuilder.Entity("BookKeeping.API.Models.IncomeOrExpenseType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("IncomeOrExpenseTypes");
                });

            modelBuilder.Entity("BookKeeping.API.Models.Bookkeeping", b =>
                {
                    b.HasOne("BookKeeping.API.Models.IncomeOrExpenseType", "IncomeOrExpenseType")
                        .WithMany()
                        .HasForeignKey("IncomeOrExpenseTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("IncomeOrExpenseType");
                });
#pragma warning restore 612, 618
        }
    }
}
