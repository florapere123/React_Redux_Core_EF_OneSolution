using System;

namespace ItemsStore.EntityModels
{
    public partial class Items
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime SaleStartDate { get; set; }
        public int ImageId { get; set; }
        public Images Images { get; set; }

    }
}
