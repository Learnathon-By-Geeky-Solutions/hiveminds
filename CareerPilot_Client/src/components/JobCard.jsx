import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const JobCard = ({ 

  title, 
  company, 
  logo, 
  location, 
  salary, 
  type,
  tags, 
  isNew, 
  isFeatured, 
  delayIndex 
}) => {
  return (
    <div 
      className="glass-card rounded-xl p-6 group animate-fade-in transition-all duration-300 hover:translate-y-[-5px]"
      style={{ animationDelay: `${delayIndex * 0.1}s` }}
    >
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-lg overflow-hidden bg-secondary flex items-center justify-center flex-shrink-0">
          <img 
            src={logo} 
            alt={`${company} logo`} 
            className="w-full h-full object-cover" 
            loading="lazy"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg text-white leading-tight">{title}</h3>
            <button className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">
              <ArrowUpRight size={16} />
            </button>
          </div>
          
          <div className="flex flex-wrap items-center text-sm text-gray-400">
            <span className="mr-3">{company}</span>
            <span className="mr-3">•</span>
            <span className="mr-3">{location}</span>
            <span className="mr-3">•</span>
            <span>{salary}</span>
          </div>

          <h2>{type}</h2>
          
          {(isNew || isFeatured) && (
            <div className="flex gap-2 mt-3">
              {isNew && (
                <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-medium">
                  New
                </span>
              )}
              {isFeatured && (
                <span className="text-xs px-2 py-1 rounded-full bg-purple-400/20 text-purple-400 font-medium">
                  Featured
                </span>
              )}
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="text-xs px-3 py-1 rounded-full bg-secondary text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;