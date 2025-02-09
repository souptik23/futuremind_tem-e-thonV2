import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle }) {
  return (
    <div className="mb-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
}

export function CardTitle({ children }) {
  return <h3 className="text-xl font-bold">{children}</h3>;
}

export function CardContent({ children }) {
  return <div className="mt-2">{children}</div>;
}
