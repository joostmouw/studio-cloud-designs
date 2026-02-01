/**
 * Loading skeleton for BagViewer3D component
 * Shows while 3D viewer is loading
 */
const BagViewer3DSkeleton = () => {
  return (
    <div className="w-full h-full bg-secondary animate-pulse rounded-sm flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
      <div className="text-center">
        <div className="h-4 w-32 bg-muted rounded mx-auto mb-4" />
        <div className="h-3 w-24 bg-muted rounded mx-auto" />
      </div>
    </div>
  );
};

export default BagViewer3DSkeleton;
