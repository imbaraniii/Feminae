import GradualSpacing from "../components/ui/gradual-spacing";

const LandingPage = () => {
  return (
    <>
      <div className="h-screen w-screen flex-auto">
        
        <GradualSpacing
          className="
            font-display 
            text-2xl sm:text-4xl md:text-6xl lg:text-7xl 
            font-bold 
            -tracking-widest 
            bg-gradient-to-r from-blue-700 to-black inline-block text-transparent bg-clip-text 
            text-left 
            ml-4 sm:ml-8 md:ml-12 lg:ml-16
          "
          text="Welcome to Femineh"
        />
      </div>
    </>
  );
};

export default LandingPage;
