'use client';

import { useState, useEffect, useRef, type FormEvent } from 'react';
import {
  Video,
  VideoOff,
  PhoneCall,
  Copy,
  MessageCircle,
  ExternalLink,
  StickyNote,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const DEFAULT_MEETING_URL = 'https://meet.google.com/your-meeting-link';
const DEFAULT_WHATSAPP_NUMBER = ''; // e.g. "15551234567"

export default function VideoChatPage() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  const [guestName, setGuestName] = useState('');
  const [meetingUrl, setMeetingUrl] = useState<string>(DEFAULT_MEETING_URL);
  const [whatsappNumber, setWhatsappNumber] = useState<string>(DEFAULT_WHATSAPP_NUMBER);
  const [hostNotes, setHostNotes] = useState<string>('');

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  };

  const startCamera = async () => {
    if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setHasCameraPermission(false);
      toast({
        variant: 'destructive',
        title: 'Device Not Supported',
        description: 'Your browser does not support camera access.',
      });
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setHasCameraPermission(true);
      setIsCameraOn(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCameraPermission(false);
      setIsCameraOn(false);
      toast({
        variant: 'destructive',
        title: 'Camera Access Denied',
        description:
          'Please enable camera permissions in your browser settings to use this room.',
      });
    }
  };

  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      if (cancelled) return;
      await startCamera();
    };

    bootstrap();

    return () => {
      cancelled = true;
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleCamera = async () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      await startCamera();
    }
  };

  const handleJoinCall = () => {
    if (!meetingUrl.trim()) {
      toast({
        variant: 'destructive',
        title: 'No Meeting Link',
        description: 'Add a meeting link before joining the call.',
      });
      return;
    }

    window.open(meetingUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyInvite = () => {
    if (!meetingUrl.trim()) {
      toast({
        variant: 'destructive',
        title: 'No Meeting Link',
        description: 'Add a meeting link before copying the invite.',
      });
      return;
    }

    const namePart = guestName ? `${guestName}, ` : '';
    const message = `${namePart}here is your interview link: ${meetingUrl}`;

    navigator.clipboard
      .writeText(message)
      .then(() => {
        toast({
          title: 'Invite Copied',
          description: 'You can paste this into email, text, or chat.',
        });
      })
      .catch((err) => {
        console.error('Clipboard error:', err);
        toast({
          variant: 'destructive',
          title: 'Copy Failed',
          description: 'Your browser blocked clipboard access.',
        });
      });
  };

  const handleOpenWhatsApp = () => {
    if (!whatsappNumber.trim() || !meetingUrl.trim()) {
      toast({
        variant: 'destructive',
        title: 'Missing Details',
        description: 'Add a WhatsApp number and meeting link before opening WhatsApp.',
      });
      return;
    }

    const namePart = guestName ? `${guestName}, ` : '';
    const message = `${namePart}here is your interview link: ${meetingUrl}`;
    const url = `https://wa.me/${encodeURIComponent(
      whatsappNumber.trim(),
    )}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleNotesSave = (e: FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Notes Updated',
      description: 'Your notes are saved locally for this session.',
    });
  };

  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-6xl space-y-4">
          {/* Page header */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-headline text-2xl md:text-3xl">Guest Interview Room</h1>
              <p className="text-sm text-muted-foreground">
                A focused, private space for live conversations with your guests.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1">
                <Video className="h-3 w-3" />
                Host Camera Check
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1">
                <PhoneCall className="h-3 w-3" />
                External Call Link
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1">
                <MessageCircle className="h-3 w-3" />
                Guest Messaging
              </span>
            </div>
          </div>

          {/* Layout */}
          <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
            {/* Left: camera */}
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between gap-2">
                <div>
                  <CardTitle className="font-headline text-xl">Live Preview</CardTitle>
                  <CardDescription>
                    Confirm your camera, lighting, and framing before you invite a guest.
                  </CardDescription>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleToggleCamera}
                >
                  {isCameraOn ? (
                    <>
                      <VideoOff className="mr-2 h-4 w-4" />
                      Turn Camera Off
                    </>
                  ) : (
                    <>
                      <Video className="mr-2 h-4 w-4" />
                      Turn Camera On
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video w-full rounded-xl bg-secondary/60 flex items-center justify-center overflow-hidden">
                  {hasCameraPermission === null && (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Video className="h-10 w-10 animate-pulse" />
                      <p>Accessing camera…</p>
                    </div>
                  )}

                  <video
                    ref={videoRef}
                    className={`h-full w-full object-cover ${
                      isCameraOn ? 'block' : 'hidden'
                    }`}
                    autoPlay
                    muted
                    playsInline
                  />

                  {hasCameraPermission && !isCameraOn && (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground text-center px-4">
                      <VideoOff className="h-10 w-10" />
                      <p className="text-sm">
                        Camera is currently off. Turn it on when you&apos;re ready.
                      </p>
                    </div>
                  )}

                  {hasCameraPermission === false && (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground text-center px-4">
                      <VideoOff className="h-10 w-10" />
                      <p className="text-sm">
                        Camera is off or unavailable. Check your device or browser settings.
                      </p>
                    </div>
                  )}
                </div>

                {hasCameraPermission === false && (
                  <Alert variant="destructive">
                    <VideoOff className="h-4 w-4" />
                    <AlertTitle>Camera Access Required</AlertTitle>
                    <AlertDescription>
                      To use this room for interviews, please allow camera access in your
                      browser&apos;s settings and refresh the page.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Right: controls */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-semibold">Session Controls</CardTitle>
                  <CardDescription>
                    Manage your guest info, meeting link, and quick actions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-muted-foreground">
                      Guest Name (optional)
                    </label>
                    <Input
                      placeholder="e.g. Dr. Jordan Smith"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-muted-foreground">
                      Interview Call Link
                    </label>
                    <Input
                      placeholder="Paste Zoom / Google Meet / Teams link here"
                      value={meetingUrl}
                      onChange={(e) => setMeetingUrl(e.target.value)}
                    />
                    <p className="text-[0.7rem] text-muted-foreground">
                      This can be any external meeting link your team uses.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-muted-foreground">
                      WhatsApp Number (optional)
                    </label>
                    <Input
                      placeholder="WhatsApp number in international format (e.g. 15551234567)"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                    />
                    <p className="text-[0.7rem] text-muted-foreground">
                      Used to open a prefilled WhatsApp message with the invite link.
                    </p>
                  </div>

                  <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                    <Button className="flex-1" type="button" onClick={handleJoinCall}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Join Interview Call
                    </Button>
                    <Button
                      className="flex-1"
                      type="button"
                      variant="outline"
                      onClick={handleCopyInvite}
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Invite
                    </Button>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleOpenWhatsApp}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Open WhatsApp with Invite
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-base font-semibold">Host Notes</CardTitle>
                    <CardDescription>
                      Keep key points or reminders in view during the interview.
                    </CardDescription>
                  </div>
                  <StickyNote className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleNotesSave} className="space-y-2 text-sm">
                    <Textarea
                      className="min-h-[120px]"
                      placeholder="Talking points, guest background, sensitive topics to avoid..."
                      value={hostNotes}
                      onChange={(e) => setHostNotes(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <Button type="submit" size="sm" variant="outline">
                        Save Notes
                      </Button>
                    </div>
                    <p className="text-[0.7rem] text-muted-foreground">
                      Notes are kept locally in this session. You can later wire this to
                      Firestore if you want them persisted per episode.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
