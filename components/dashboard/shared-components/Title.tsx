const Title = ({ title }: { title: string }) => {
  return (
    <h1 className="text-2xl w-full text-center font-medium sm:text-3xl md:text-4xl">
      {title}
    </h1>
  );
};

export default Title;
