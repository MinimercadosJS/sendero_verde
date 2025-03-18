import CanastaFamiliarIcon from "@/assets/icons/categories/canastaFamiliar";
import BebidasIcon from "@/assets/icons/categories/bebidas";
import MecatoIcon from "@/assets/icons/categories/mecato";
import MascotasIcon from "@/assets/icons/categories/mascotas";
import LicorIcon from "@/assets/icons/categories/licor";
import CategoryCard from "./components/CategoryCard";
import ProductsSlider from "./components/ProductsSlider";

export const revalidate = 14400;

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* <div className="w-full flex flex-wrap gap-5 justify-center mb-10 ">
        <CategoryCard category="alimentos básicos" ><CanastaFamiliarIcon /></CategoryCard>
        <CategoryCard category="bebidas" ><BebidasIcon /></CategoryCard>
        <CategoryCard category="mecato"> <MecatoIcon /></CategoryCard>
        <CategoryCard category="licor"> <LicorIcon /></CategoryCard>
        <CategoryCard category="mascotas"> <MascotasIcon /></CategoryCard>

      </div> */}

      {/* <CategoryCard
        category="alimentos básicos"
        children={<CanastaFamiliarIcon />}
      /> */}
      <ProductsSlider title="Alimentos básicos" category="alimentos básicos" />
      {/* <CategoryCard category="mecato" children={<MecatoIcon />} />  */}
      <ProductsSlider title="Mecato" category="mecato" />
      <ProductsSlider title="Bebidas" category="bebidas" />
      <ProductsSlider title="Aseo del hogar" category="aseo" />
      <ProductsSlider title="Cuidado e higiene" category="cuidado e higiene" />
      <ProductsSlider title="Mascotas" category="mascotas" />
      <ProductsSlider title="Licores" category="licor" />
      <ProductsSlider title="Otros" category="otra" />
    </div>
  );
}
