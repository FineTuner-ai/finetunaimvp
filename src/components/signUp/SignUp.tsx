import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, Mail } from 'lucide-react';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement actual registration logic here
    console.log('Signing up with:', { name, email, password });
    navigate('/SignUp');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-500">FineTunAI</h1>
          <h2 className="text-xl text-gray-600 mt-4">Create an account</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <User size={20} />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full pl-10 pr-3 py-3 bg-blue-50 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <Mail size={20} />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full pl-10 pr-3 py-3 bg-blue-50 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <Lock size={20} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
              className="w-full pl-10 pr-10 py-3 bg-blue-50 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Account
          </button>
        </form>

        <div className="mt-4 text-center text-gray-600">
          <span>Already have an account? </span>
          <Link to="/Login" className="text-blue-500 font-medium hover:text-blue-600">
            Login
          </Link>
        </div>

        <div className="mt-8">
          <div className="text-center text-gray-600 mb-4">Sign up with</div>
          <button
            type="button"
            className="w-full flex items-center justify-center py-3 px-4 border border-gray-100 rounded-xl shadow-sm bg-white hover:bg-gray-50"
          >
            <img 
              src="https://www.google.com/favicon.ico" 
              alt="Google" 
              className="h-5 w-5 mr-2"
            />
            <span className="text-gray-700">Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;