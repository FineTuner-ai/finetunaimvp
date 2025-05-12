
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to RAG page
    navigate('/rag');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-finetun-dark">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">Loading FineTunAI...</h1>
        <div className="w-16 h-16 mx-auto border-t-4 border-finetun-purple rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Index;
