import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";
import Heading from "@/components/ui/Heading";
import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import Link from "next/link";
import GoBackButton from "@/components/ui/GoBackButton";

async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  if (!product) {
    notFound();
  }
  return product;
}

export default async function EditProductsPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(+params.id);

  return (
    <>
      <Heading>Editar Producto: {product.name}</Heading>

      <GoBackButton />

      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  );
}
