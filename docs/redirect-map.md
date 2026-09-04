# Redirect map

Vercel applies these as permanent redirects from `vercel.json`.

| Source | Destination | Reason |
|---|---|---|
| `/index.html` | `/` | Consolidate duplicate homepage URL |
| `/process` | `/grant-growth-system.html` | Replace the former process page |
| `/process.html` | `/grant-growth-system.html` | Preserve the existing indexed route |
| `/grant-growth-system` | `/grant-growth-system.html` | Clean-route resilience |
| `/services` | `/#services` | Consolidate service content into Home |
| `/services.html` | `/#services` | Consolidate the retired staging page into Home |
| `/about` | `/about.html` | Clean-route resilience |
| `/insights` | `/grant-growth-system.html` | Retire the expanded editorial concept from this launch |
| `/insights.html` | `/grant-growth-system.html` | Retire the expanded editorial concept from this launch |
| `/insights/a-strong-mission-is-not-a-grant-strategy.html` | `/grant-growth-system.html` | Preserve a safe destination for the retired staging article route |
| `/contact` | `/contact.html` | Clean-route resilience |
| `/privacy` | `/privacy.html` | Clean-route resilience |

`process.html` also contains a static redirect fallback for staging providers that do not interpret `vercel.json`.

No production redirect is active until the approved site is deployed.
