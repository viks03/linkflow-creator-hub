
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			scale: {
				'102': '1.02',
				'105': '1.05',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom theme colors
				linkflow: {
					blue: '#3B82F6',
					purple: '#8B5CF6',
					pink: '#EC4899',
					orange: '#F97316',
					green: '#10B981',
					teal: '#0D9488',
					red: '#EF4444',
					indigo: '#4F46E5',
					slate: '#475569',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'avatar-zoom': {
					'0%': {
						transform: 'scale(1)'
					},
					'100%': {
						transform: 'scale(1.08)'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'link-pulse': {
					'0%, 100%': {
						transform: 'scale(1)'
					},
					'50%': {
						transform: 'scale(1.02)'
					}
				},
				'shimmer': {
					'0%': {
						backgroundPosition: '-500px 0'
					},
					'100%': {
						backgroundPosition: '500px 0'
					}
				},
				'bounce-subtle': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-4px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'avatar-zoom': 'avatar-zoom 0.3s ease-out forwards',
				'fade-in': 'fade-in 0.5s ease-out',
				'link-pulse': 'link-pulse 2s infinite ease-in-out',
				'shimmer': 'shimmer 1.5s infinite linear',
				'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite'
			},
			backgroundImage: {
				'gradient-1': 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
				'gradient-2': 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
				'gradient-3': 'linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)',
				'gradient-4': 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
				'gradient-5': 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)',
				'gradient-6': 'linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)',
				'gradient-7': 'linear-gradient(to right, #DECBA4, #3E5151)',
				'gradient-8': 'linear-gradient(to right, #4389A2, #5C258D)',
				'gradient-9': 'linear-gradient(to right, #c94b4b, #4b134f)',
				'gradient-10': 'linear-gradient(to right, #00b09b, #96c93d)',
				'shimmer': 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
