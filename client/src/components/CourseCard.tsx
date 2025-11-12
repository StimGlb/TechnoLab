import React from 'react';

interface CourseCardProps {
  title: string;
  description: string;
  date: string;
  isCompleted?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  date,
  isCompleted = false,
}) => {
  return (
    <div className="course-card border-l-4 border-primary-500">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            isCompleted
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {isCompleted ? 'Terminé' : 'En cours'}
        </span>
      </div>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-500 dark:text-gray-400">{date}</span>
        <button className="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition">
          Voir plus
        </button>
      </div>
    </div>
  );
};
