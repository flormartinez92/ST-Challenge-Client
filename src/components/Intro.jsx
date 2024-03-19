import CardItem from "./CardItem";

const Intro = () => {
  return (
    <section className="h-full bg-slate-50 py-6 max-w-[1200px] m-auto min-h-[calc(100vh-230px)]">
      <CardItem allowModal={true} />
    </section>
  );
};

export default Intro;
