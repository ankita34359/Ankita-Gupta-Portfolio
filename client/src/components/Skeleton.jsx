import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const Skeleton = ({ className }) => {
    return (
        <div className={cn(
            "relative overflow-hidden bg-gray-200 dark:bg-gray-800 rounded-xl",
            className
        )}>
            <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "linear"
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-primary/10 to-transparent"
            />
        </div>
    );
};

export const ProjectSkeleton = () => (
    <div className="rounded-[1.5rem] bg-white dark:bg-[#12121c] border border-gray-100 dark:border-white/5 overflow-hidden shadow-xl p-4 space-y-4">
        <Skeleton className="aspect-video w-full rounded-2xl" />
        <div className="space-y-3 px-2 pb-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex gap-2 pt-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
            </div>
            <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-white/5">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        </div>
    </div>
);

export const CertificateSkeleton = () => (
    <div className="p-4 rounded-[2rem] border border-gray-100 dark:border-white/5 bg-white dark:bg-[#12121c] shadow-xl space-y-4">
        <div className="p-6 space-y-4">
            <div className="flex justify-between items-start">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-10 rounded-xl" />
            </div>
            <Skeleton className="h-7 w-5/6" />
            <Skeleton className="h-4 w-1/2" />
            <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-white/5">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        </div>
    </div>
);

export default Skeleton;
