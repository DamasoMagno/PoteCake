import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export function Product({ product }: any) {
  const { query } = useRouter();
  console.log(query);

  return (
    <div></div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      product: {
        name: "Bolo de Chocolate"
      }
    }
  }
}