# Reproduction: TS2344 from missing `canPreventDefault` in event maps

**PR:** https://github.com/react-navigation/react-navigation/pull/13035

## The problem

`EventListenerCallback` in `@react-navigation/core` defines a default generic parameter:

```typescript
type EventListenerCallback<
  EventMap extends EventMapBase,
  EventName extends keyof EventMap,
  EventCanPreventDefault extends boolean | undefined = EventMap[EventName]['canPreventDefault']
>
```

When tsc emits `.d.ts` for a downstream package that uses `ScreenListeners` with a concrete event map (e.g., expo-router), it evaluates `EventMap[EventName]['canPreventDefault']` on the concrete type. For events like `focus` (`{ data: undefined }`), the property doesn't exist — tsc resolves it to `unknown`.

This `unknown` gets baked into the emitted `.d.ts` and violates the `extends boolean | undefined` constraint, producing TS2344 for any consumer with `skipLibCheck: false`.

**23 events** across **6 packages** are affected:

| Package | Events missing `canPreventDefault` |
|---------|-----------------------------------|
| `@react-navigation/core` (EventMapCore) | `focus`, `blur`, `state` |
| `@react-navigation/native-stack` | `transitionStart`, `transitionEnd`, `gestureCancel`, `sheetDetentChange` |
| `@react-navigation/bottom-tabs` | `tabLongPress`, `transitionStart`, `transitionEnd` |
| `@react-navigation/stack` | `transitionStart`, `transitionEnd`, `gestureStart`, `gestureEnd`, `gestureCancel` |
| `@react-navigation/drawer` | `transitionStart`, `transitionEnd`, `gestureStart`, `gestureEnd`, `gestureCancel` |
| `@react-navigation/material-top-tabs` | `tabLongPress`, `swipeStart`, `swipeEnd` |

Events that already declare `canPreventDefault: true` (like `beforeRemove`, `tabPress`, `drawerItemPress`) are unaffected.

## Why react-navigation's own typecheck doesn't catch this

- react-navigation uses `skipLibCheck: true` and `--noEmit`
- In generic context, TypeScript resolves `EventMap[EventName]['canPreventDefault']` through the `EventMapBase` constraint → `boolean | undefined` (OK)
- The issue only manifests when tsc evaluates on a **concrete type** during `.d.ts` emission

## Real-world impact

expo-router@55.0.3 ships `unknown` in the emitted declarations — 64 TS2344 errors per frontend in my monorepo (`skipLibCheck: false`):
- `build/layouts/StackClient.d.ts` — 28 errors
- `build/layouts/TabsClient.d.ts` — 36 errors

## Reproduce

```bash
npm install --legacy-peer-deps
npm run check          # 23 TS2344 errors
npm run check:fixed    # 0 errors
```

- `repro.ts` — type aliases from expo-router's emitted `.d.ts`, with `unknown` as the 3rd parameter (current state)
- `repro-fixed.ts` — same aliases with `undefined` instead of `unknown` (state after the PR)

The **only difference** between the two files is `unknown` → `undefined`. This corresponds to adding `canPreventDefault?: undefined` to each non-preventable event in react-navigation's source.

## The fix

Add `canPreventDefault?: undefined` to all non-preventable events across 6 packages. This causes tsc's declaration emitter to produce `undefined` instead of `unknown`, which satisfies the `extends boolean | undefined` constraint.

- 6 files changed, ~23 lines added
- Zero runtime changes, zero behavior changes
- Follows the existing pattern: `beforeRemove` already declares `canPreventDefault: true`
