import { Navbar } from "@/components/navbar";
import { ProductGrid } from "@/components/product-grid";
import { CartPanel } from "@/components/cart-panel";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <Navbar />
      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-12 md:grid-cols-[1fr_360px] md:px-10">
        <ProductGrid />
        <CartPanel />
      </main>
    </div>
  );
}
