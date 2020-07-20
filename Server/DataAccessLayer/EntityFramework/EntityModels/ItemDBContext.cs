using ItemsStore.Repositories.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace ItemsStore.EntityModels
{
    public class ItemDBContext : DbContext
    {

        public ItemDBContext()
        {
        }

        public ItemDBContext(DbContextOptions<ItemDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Items> Items { get; set; }
        public virtual DbSet<Images> Images { get; set; }
        public virtual DbSet<ItemEntity> ItemEntity { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
              // optionsBuilder.UseSqlServer("Server=DESKTOP-3K0197D ;Database=GeneralDB;Trusted_Connection=True;");
              //  optionsBuilder.UseSqlServer(ConfigurationManager.ConnectionStrings["ItemsStoreDatabase"].ConnectionString);
                IConfigurationRoot configuration = new ConfigurationBuilder()
               .SetBasePath(Directory.GetCurrentDirectory())
               .AddJsonFile("appsettings.json")
               .Build();
                var connectionString = configuration.GetConnectionString("ItemsStoreDatabase");
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.HasAnnotation("ProductVersion", "2.2.2-servicing-10034");

            //modelBuilder.Entity<Items>(entity =>
            //{
            //    entity.HasKey(e => e.Id)
            //       .HasName("PK_Items");
            //    entity.HasKey(e => e.ImageId)
            //     .HasName("FK_Items_Images");
            //    entity.Property(e => e.Description).HasMaxLength(50);

            //    entity.Property(e => e.Name).HasMaxLength(50);
            //    entity.Property(e => e.SaleStartDate);

            //    entity.Property(e => e.ImageId);

            //}) ;
            modelBuilder.Entity<Items>()
           .HasOne(e => e.Images)
           .WithOne(e => e.Items)
           .HasForeignKey<Items>(e => e.ImageId);
            modelBuilder.Entity<Images>(entity =>
            {
                entity.HasKey(e => e.Id)
                   .HasName("PK_Images");

                entity.Property(e => e.ImageUrl).HasMaxLength(200);


            });
        }

    }
}
