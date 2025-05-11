export function getInitials(name) {
    if (!name) return;
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
        return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function getColorFromInitials(initials) {
    const colors = [
        'bg-amber-600',
        'bg-orange-500',
        'bg-violet-600',
        'bg-indigo-600',
        'bg-slate-700',
        'bg-sky-600',
        'bg-teal-600',
        'bg-lime-600'
    ];

    let hash = 0;
    for (let i = 0; i < initials.length; i++) {
        hash += initials.charCodeAt(i);
    }

    return colors[hash % colors.length]
}