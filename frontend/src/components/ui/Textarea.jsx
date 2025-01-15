import React from 'react';

export const Textarea = ({ className, ...props }) => (
  <textarea
    className={`w-full p-2 border rounded-md resize-none ${className}`}
    {...props}
  />
);
