import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ListChecks } from "lucide-react";

const Skills = () => {
  // Define the skills array
  const skills = [
    { name: "JavaScript", category: "expert", level: 90 },
    { name: "React", category: "advanced", level: 85 },
    { name: "Node.js", category: "intermediate", level: 70 },
    { name: "Python", category: "beginner", level: 50 },
    { name: "Ruby", category: "intermediate", level: 70 },
    { name: "PHP", category: "beginner", level: 55 },
    { name: "TypeScript", category: "advanced", level: 85 },
    { name: "Go", category: "beginner", level: 65 },
  ];

  // Define the tools array
  const tools = ["VS Code", "Git", "Docker", "Figma", "Postman"];

  // Function to determine badge styling based on skill category
  const getLevelBadge = (category) => {
    switch (category) {
      case "expert":
        return "bg-green-500/20 text-green-300";
      case "advanced":
        return "bg-blue-500/20 text-blue-300";
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-300";
      case "beginner":
        return "bg-red-500/20 text-red-300";
      default:
        return "bg-secondary/40 text-muted-foreground";
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ListChecks size={18} className="text-primary" />
          Skills & Tools
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Skills Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span>{skill.name}</span>
                <Badge
                  className={cn("font-normal", getLevelBadge(skill.category))}
                >
                  {skill.category.charAt(0).toUpperCase() +
                    skill.category.slice(1)}
                </Badge>
              </div>
              <div className="w-full h-2 bg-secondary/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Tools Section */}
        <div className="flex flex-wrap gap-2 mt-6">
          {tools.map((tool, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-secondary/40 font-normal"
            >
              {tool}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Skills;
