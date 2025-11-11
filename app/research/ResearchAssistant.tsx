// app/research/page.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import ResearchAssistant from '@/components/research/ResearchAssistant';

export default function ResearchPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Research Assistant</CardTitle>
          <CardDescription>
            Prep each dating-show episode like a TV segment: set the topic,
            guest, and notes, then let the assistant shape a brief you can
            print or save.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResearchAssistant />
        </CardContent>
      </Card>
    </div>
  );
}
