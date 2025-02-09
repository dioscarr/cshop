const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",  // increased ring width to 2
  {
    variants: {
      variant: {
        default:
          "bg-[var(--main-color)] text-white shadow-lg hover:bg-[var(--main-color)]/80", // added shadow-lg and adjusted hover opacity
      },
    },
  }
)
