import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { meetups } from "@/data/meetups";

export function MeetupWidget() {
  return (
    <Card className="col-span-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          🥥 다가오는 밋업
          <span className="text-xs font-normal text-muted-foreground">
            ({meetups.length}건/월)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {meetups.slice(0, 3).map((meetup) => (
            <div key={`${meetup.date}-${meetup.city}`} className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-semibold">
                {meetup.city}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">
                  {meetup.date}: {meetup.city} {meetup.location}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex -space-x-1">
                    {meetup.avatarUrls.slice(0, 4).map((_, i) => (
                      <Avatar key={i} className="h-5 w-5 border border-background">
                        <AvatarFallback className="text-[10px] bg-muted">
                          {String.fromCharCode(65 + i)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {meetup.attendees}명 참가
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <a
          href="#"
          className="mt-4 block text-center text-sm font-medium text-primary hover:underline"
        >
          전체 밋업 보기 →
        </a>
      </CardContent>
    </Card>
  );
}
