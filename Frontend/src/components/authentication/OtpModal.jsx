import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Mail, Loader2, ArrowRight, RefreshCw } from 'lucide-react'

const OtpModal = ({ open, setOpen, email, onVerify, onResend }) => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);

    // 60-second cooldown timer for resending OTP
    useEffect(() => {
        let timer;
        if (open) {
            setCountdown(60);
            setCanResend(false);
            setOtp("");
            timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setCanResend(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [open]);

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!otp || otp.length < 6) return;
        try {
            setLoading(true);
            await onVerify(otp.trim());
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (!canResend || resending) return;
        try {
            setResending(true);
            if (onResend) await onResend();
            setCountdown(60);
            setCanResend(false);
            setOtp("");
        } finally {
            setResending(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[440px] p-6 bg-white rounded-2xl shadow-xl">
                <DialogHeader className="text-center sm:text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-purple-600 mb-3">
                        <Mail size={26} />
                    </div>
                    <DialogTitle className="text-xl font-bold text-gray-800">Verify Your Email</DialogTitle>
                    <DialogDescription className="text-sm text-gray-500 mt-1">
                        We sent a 6-digit verification code to
                        <br />
                        <span className="font-semibold text-gray-800">{email}</span>
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleVerify} className="mt-4 space-y-4">
                    <div>
                        <Input
                            type="text"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                            placeholder="• • • • • •"
                            autoFocus
                            className="text-center font-mono text-2xl tracking-[12px] h-14 border-gray-300 rounded-xl focus:border-purple-600 focus:ring-purple-200"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading || otp.length !== 6}
                        className="w-full h-11 bg-[#7209b7] hover:bg-[#5a0791] text-white font-medium rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" /> Creating Account...
                            </>
                        ) : (
                            <>
                                Verify & Register <ArrowRight size={16} />
                            </>
                        )}
                    </Button>

                    <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                        <span>Didn't receive the code?</span>
                        {canResend ? (
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={resending}
                                className="text-purple-600 font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                            >
                                {resending && <RefreshCw size={12} className="animate-spin" />}
                                Resend Code
                            </button>
                        ) : (
                            <span className="text-gray-400">Resend in {countdown}s</span>
                        )}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default OtpModal;
