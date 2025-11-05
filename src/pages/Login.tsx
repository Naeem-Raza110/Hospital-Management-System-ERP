import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLogin?: () => void;
}

const Button = ({ children, ...props }: any) => (
  <button
    {...props}
    className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-all ${props.className || ""}`}
  >
    {children}
  </button>
);

const Input = (props: any) => (
  <input
    {...props}
    className={`border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-500 outline-none ${props.className || ""}`}
  />
);

const Label = ({ htmlFor, children }: any) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium mb-1">
    {children}
  </label>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl p-6 shadow-lg ${className}`}>{children}</div>
);
const CardHeader = ({ children }: { children: React.ReactNode }) => <div className="mb-4">{children}</div>;
const CardTitle = ({ children }: { children: React.ReactNode }) => <h2 className="text-xl font-semibold">{children}</h2>;
const CardDescription = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-gray-500">{children}</p>
);
const CardContent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

const Tabs = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
const TabsList = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-2 mb-4 bg-gray-100 p-1 rounded">{children}</div>
);
const TabsTrigger = ({
  value,
  selected,
  onClick,
  children,
}: {
  value: string;
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`py-2 px-3 rounded ${selected ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-blue-50"}`}
  >
    {children}
  </button>
);
const TabsContent = ({ value, active, children }: { value: string; active: boolean; children: React.ReactNode }) =>
  active ? <div>{children}</div> : null;

const Login = ({ onLogin }: LoginProps) => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/verify-token", { headers: { Authorization: `Bearer ${token}` } })
        .then(() => navigate("/dashboard"))
        .catch(() => localStorage.removeItem("token"));
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/login", {
        email: loginEmail,
        password: loginPassword,
      });

      localStorage.setItem("token", res.data.token);

      onLogin?.();
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:5000/register", {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      });
      alert("Registration successful! Please login now.");
      setActiveTab("login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-white font-bold text-3xl">H+</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Hospital Management khura</h1>
          <p className="text-gray-600 mt-2">Login or create a new account to continue.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
            <CardDescription>Access your hospital dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs>
              <TabsList>
                <TabsTrigger value="login" selected={activeTab === "login"} onClick={() => setActiveTab("login")}>
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  selected={activeTab === "register"}
                  onClick={() => setActiveTab("register")}
                >
                  Register
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" active={activeTab === "login"}>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="admin@hospital.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                  <Button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" active={activeTab === "register"}>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Name</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="John Doe"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="admin@hospital.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                  <Button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Register"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
