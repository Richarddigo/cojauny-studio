import React from 'react';

interface FlagIconProps {
    className?: string;
}

export const SpainFlag: React.FC<FlagIconProps> = ({ className = "h-6 w-6" }) => (
    <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <rect y="0" x="0" height="32" width="32" fill="#c60b1e"/>
        <rect y="8" x="0" height="16" width="32" fill="#ffc400"/>
    </svg>
);

export const UKFlag: React.FC<FlagIconProps> = ({ className = "h-6 w-6" }) => (
    <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <rect y="0" x="0" height="32" width="32" fill="#012169"/>
        <path d="M0 0 L32 21.333 L32 32 L0 10.667 Z M32 0 L0 21.333 L0 32 L32 10.667 Z" fill="#fff"/>
        <path d="M0 0 L32 21.333 L32 26.667 L0 5.333 Z M32 0 L0 21.333 L0 26.667 L32 5.333 Z" fill="#C8102E"/>
        <path d="M12 0 L12 32 M20 0 L20 32 M0 10.667 L0 21.333 M32 10.667 L32 21.333" stroke="#fff" strokeWidth="5.33"/>
        <path d="M16 0 L16 32 M0 16 L32 16" stroke="#fff" strokeWidth="8.53"/>
        <path d="M16 0 L16 32 M0 16 L32 16" stroke="#C8102E" strokeWidth="5.33"/>
    </svg>
);

export const GermanyFlag: React.FC<FlagIconProps> = ({ className = "h-6 w-6" }) => (
    <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <rect y="0" x="0" height="10.667" width="32" fill="#000"/>
        <rect y="10.667" x="0" height="10.667" width="32" fill="#D00"/>
        <rect y="21.333" x="0" height="10.667" width="32" fill="#FFCE00"/>
    </svg>
);

export const FranceFlag: React.FC<FlagIconProps> = ({ className = "h-6 w-6" }) => (
    <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <rect y="0" x="0" height="32" width="10.667" fill="#002395"/>
        <rect y="0" x="10.667" height="32" width="10.667" fill="#fff"/>
        <rect y="0" x="21.333" height="32" width="10.667" fill="#ED2939"/>
    </svg>
);
