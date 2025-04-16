# Research Notes — CyberArmor Red Team Kit v2.0

## Attack Flow Simulated

1. User connects to dApp over HTTPS
2. Signs EIP-2612 `permit(...)`
3. Permit captured silently via backend
4. Delayed drain executed via `drainTokensWithPermit(...)`

## Testing Flow

- [x] MetaMask frontend integration working
- [x] Permit logs to Telegram ✅
- [x] Delayed drain trigger ✅
- [x] Works on both Desktop & Mobile UX
- [ ] Multi-chain support (coming in v3)

## Notes

- Gas estimation fails are expected for unverified contracts / no balance.
- SelfDestruct fallback included.
- Mobile crash prevention via `window.ethereum` check.
