export default function Home() {
  const mintByAA = async () => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <main className="w-full min-h-screen m-auto  bg-[url('~/public/bg.png'),_url('~/public/splashedwater.png')] bg-cover bg-center flex flex-col justify-center items-center">
        <div className="w-full h-full m-auto bg-splashedwater bg-cover bg-center flex flex-col justify-center items-center">
          TEST
          <div>
            <button onClick={() => mintByAA()}>Mint By AA</button>
          </div>
        </div>
      </main>
    </>
  );
}
