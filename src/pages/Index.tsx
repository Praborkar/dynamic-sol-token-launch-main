
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Loader2, Rocket, TrendingUp, ArrowRightLeft, Wallet, Shield } from 'lucide-react';

const Index = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenDescription, setTokenDescription] = useState('');
  const [creatorFee, setCreatorFee] = useState('1.0');
  const [buyAmount, setBuyAmount] = useState('');
  const [loading, setLoading] = useState<string | null>(null);
  const [poolState, setPoolState] = useState<any>(null);

  const handleApiCall = async (endpoint: string, data: any, successMessage: string) => {
    setLoading(endpoint);
    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: successMessage,
        });
        console.log(`${endpoint} result:`, result);
        return result;
      } else {
        throw new Error(result.error || `${endpoint} failed`);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : `${endpoint} failed`,
        variant: "destructive",
      });
      console.error(`${endpoint} error:`, error);
    } finally {
      setLoading(null);
    }
  };

  const handleLaunch = () => {
    if (!walletAddress || !tokenName || !tokenSymbol) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const creatorFeeNum = parseFloat(creatorFee);
    if (creatorFeeNum < 0 || creatorFeeNum > 4.5) {
      toast({
        title: "Invalid Creator Fee",
        description: "Creator fee must be between 0% and 4.5%",
        variant: "destructive",
      });
      return;
    }

    handleApiCall('launch', {
      walletAddress,
      tokenName,
      tokenSymbol,
      tokenDescription,
      creatorFee: creatorFeeNum,
    }, 'Token launched successfully!');
  };

  const handleBuy = () => {
    if (!walletAddress || !buyAmount) {
      toast({
        title: "Validation Error",
        description: "Please enter wallet address and buy amount",
        variant: "destructive",
      });
      return;
    }

    handleApiCall('buy', {
      walletAddress,
      solAmount: parseFloat(buyAmount),
    }, `Successfully bought tokens with ${buyAmount} SOL!`);
  };

  const handleMigrate = () => {
    if (!walletAddress) {
      toast({
        title: "Validation Error",
        description: "Please enter wallet address",
        variant: "destructive",
      });
      return;
    }

    handleApiCall('migrate', {
      walletAddress,
    }, 'Successfully migrated to DAMM V2 pool!');
  };

  const handleClaim = () => {
    if (!walletAddress) {
      toast({
        title: "Validation Error",
        description: "Please enter wallet address",
        variant: "destructive",
      });
      return;
    }

    handleApiCall('claim', {
      walletAddress,
    }, 'Fees claimed successfully!');
  };

  const handleValidate = async () => {
    if (!walletAddress) {
      toast({
        title: "Validation Error",
        description: "Please enter wallet address",
        variant: "destructive",
      });
      return;
    }

    const result = await handleApiCall('validate', {
      walletAddress,
    }, 'Pool state retrieved successfully!');

    if (result) {
      setPoolState(result);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Solana Token Launcher
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Launch SPL tokens with Dynamic Bonding Curves on Solana Devnet
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span>10B Total Supply</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span>80% DBC Distribution</span>
            </div>
            <div className="flex items-center space-x-2">
              <ArrowRightLeft className="w-4 h-4 text-purple-400" />
              <span>Auto DAMM V2 Migration</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Launch Token Card */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Rocket className="w-5 h-5 text-purple-400" />
                <span>Launch Token</span>
              </CardTitle>
              <CardDescription className="text-gray-400">
                Create a new SPL token with bonding curve
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="wallet" className="text-gray-300">Wallet Address</Label>
                <Input
                  id="wallet"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="Enter your Solana wallet address"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-gray-300">Token Name</Label>
                  <Input
                    id="name"
                    value={tokenName}
                    onChange={(e) => setTokenName(e.target.value)}
                    placeholder="My Token"
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="symbol" className="text-gray-300">Symbol</Label>
                  <Input
                    id="symbol"
                    value={tokenSymbol}
                    onChange={(e) => setTokenSymbol(e.target.value)}
                    placeholder="MTK"
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description" className="text-gray-300">Description</Label>
                <Textarea
                  id="description"
                  value={tokenDescription}
                  onChange={(e) => setTokenDescription(e.target.value)}
                  placeholder="Describe your token..."
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="fee" className="text-gray-300">Creator Fee (%)</Label>
                <Input
                  id="fee"
                  type="number"
                  min="0"
                  max="4.5"
                  step="0.1"
                  value={creatorFee}
                  onChange={(e) => setCreatorFee(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
                <p className="text-xs text-gray-500 mt-1">Platform fee: 0.5% (fixed)</p>
              </div>
              <Button
                onClick={handleLaunch}
                disabled={loading === 'launch'}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {loading === 'launch' ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Launching...
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4 mr-2" />
                    Launch Token
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Trading Actions Card */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span>Trading & Management</span>
              </CardTitle>
              <CardDescription className="text-gray-400">
                Buy tokens, migrate pools, and manage fees
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="buyAmount" className="text-gray-300">Buy Amount (SOL)</Label>
                <Input
                  id="buyAmount"
                  type="number"
                  step="0.01"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  placeholder="0.1"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleBuy}
                  disabled={loading === 'buy'}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {loading === 'buy' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Buy Tokens'
                  )}
                </Button>
                
                <Button
                  onClick={handleMigrate}
                  disabled={loading === 'migrate'}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading === 'migrate' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Migrate Pool'
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleClaim}
                  disabled={loading === 'claim'}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  {loading === 'claim' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Wallet className="w-4 h-4 mr-1" />
                      Claim Fees
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={handleValidate}
                  disabled={loading === 'validate'}
                  variant="outline"
                  className="border-slate-600 text-white hover:bg-slate-700"
                >
                  {loading === 'validate' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Validate Pool'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pool State Display */}
        {poolState && (
          <Card className="mt-8 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Pool State</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-900 p-4 rounded-lg text-green-400 text-sm overflow-auto">
                {JSON.stringify(poolState, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>⚠️ This is running on Solana Devnet for testing purposes</p>
          <p className="mt-2">Migration triggers automatically at 85.85 SOL threshold</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
