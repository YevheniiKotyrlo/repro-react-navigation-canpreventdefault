/**
 * TS2344 reproduction: @react-navigation event maps missing canPreventDefault
 * https://github.com/react-navigation/react-navigation/pull/13035
 *
 * These type aliases are copied verbatim from expo-router@55.0.3's emitted .d.ts
 * (StackClient.d.ts, TabsClient.d.ts, DrawerClient.d.ts).
 *
 * When expo-router's tsc expanded ScreenListeners with concrete event maps, the
 * default 3rd parameter of EventListenerCallback resolved to `unknown` for every
 * event that doesn't declare canPreventDefault. This `unknown` violates the
 * constraint `extends boolean | undefined`.
 *
 * Run: npm install --legacy-peer-deps && npm run check
 * Expected: 0 errors — one per non-preventable event across 6 packages.
 *
 * Then: npm run check
 * Expected: 0 errors — same events with `undefined` instead of `unknown`.
 */
import type {
  EventListenerCallback,
  EventMapCore,
  StackNavigationState,
  TabNavigationState,
  DrawerNavigationState,
  ParamListBase,
} from '@react-navigation/native';
import type { NativeStackNavigationEventMap } from '@react-navigation/native-stack';
import type { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';
import type { StackNavigationEventMap } from '@react-navigation/stack';
import type { DrawerNavigationEventMap } from '@react-navigation/drawer';
import type { MaterialTopTabNavigationEventMap } from '@react-navigation/material-top-tabs';

// ─── @react-navigation/core — EventMapCore (3 events) ───────────────────────

type CoreFocus = EventListenerCallback<NativeStackNavigationEventMap & EventMapCore<StackNavigationState<ParamListBase>>, "focus", undefined>;
type CoreBlur = EventListenerCallback<NativeStackNavigationEventMap & EventMapCore<StackNavigationState<ParamListBase>>, "blur", undefined>;
type CoreState = EventListenerCallback<NativeStackNavigationEventMap & EventMapCore<StackNavigationState<ParamListBase>>, "state", undefined>;

// ─── @react-navigation/native-stack (4 events) ──────────────────────────────

type NativeStackTransitionStart = EventListenerCallback<NativeStackNavigationEventMap & EventMapCore<StackNavigationState<ParamListBase>>, "transitionStart", undefined>;
type NativeStackTransitionEnd = EventListenerCallback<NativeStackNavigationEventMap & EventMapCore<StackNavigationState<ParamListBase>>, "transitionEnd", undefined>;
type NativeStackGestureCancel = EventListenerCallback<NativeStackNavigationEventMap & EventMapCore<StackNavigationState<ParamListBase>>, "gestureCancel", undefined>;
type NativeStackSheetDetentChange = EventListenerCallback<NativeStackNavigationEventMap & EventMapCore<StackNavigationState<ParamListBase>>, "sheetDetentChange", undefined>;

// ─── @react-navigation/bottom-tabs (3 events) ───────────────────────────────

type BottomTabTabLongPress = EventListenerCallback<BottomTabNavigationEventMap & EventMapCore<TabNavigationState<ParamListBase>>, "tabLongPress", undefined>;
type BottomTabTransitionStart = EventListenerCallback<BottomTabNavigationEventMap & EventMapCore<TabNavigationState<ParamListBase>>, "transitionStart", undefined>;
type BottomTabTransitionEnd = EventListenerCallback<BottomTabNavigationEventMap & EventMapCore<TabNavigationState<ParamListBase>>, "transitionEnd", undefined>;

// ─── @react-navigation/stack (5 events) ──────────────────────────────────────

type StackTransitionStart = EventListenerCallback<StackNavigationEventMap & EventMapCore<StackNavigationState<ParamListBase>>, "transitionStart", undefined>;
type StackTransitionEnd = EventListenerCallback<StackNavigationEventMap & EventMapCore<StackNavigationState<ParamListBase>>, "transitionEnd", undefined>;
type StackGestureStart = EventListenerCallback<StackNavigationEventMap & EventMapCore<StackNavigationState<ParamListBase>>, "gestureStart", undefined>;
type StackGestureEnd = EventListenerCallback<StackNavigationEventMap & EventMapCore<StackNavigationState<ParamListBase>>, "gestureEnd", undefined>;
type StackGestureCancel = EventListenerCallback<StackNavigationEventMap & EventMapCore<StackNavigationState<ParamListBase>>, "gestureCancel", undefined>;

// ─── @react-navigation/drawer (5 events) ─────────────────────────────────────

type DrawerTransitionStart = EventListenerCallback<DrawerNavigationEventMap & EventMapCore<DrawerNavigationState<ParamListBase>>, "transitionStart", undefined>;
type DrawerTransitionEnd = EventListenerCallback<DrawerNavigationEventMap & EventMapCore<DrawerNavigationState<ParamListBase>>, "transitionEnd", undefined>;
type DrawerGestureStart = EventListenerCallback<DrawerNavigationEventMap & EventMapCore<DrawerNavigationState<ParamListBase>>, "gestureStart", undefined>;
type DrawerGestureEnd = EventListenerCallback<DrawerNavigationEventMap & EventMapCore<DrawerNavigationState<ParamListBase>>, "gestureEnd", undefined>;
type DrawerGestureCancel = EventListenerCallback<DrawerNavigationEventMap & EventMapCore<DrawerNavigationState<ParamListBase>>, "gestureCancel", undefined>;

// ─── @react-navigation/material-top-tabs (3 events) ─────────────────────────

type MaterialTopTabTabLongPress = EventListenerCallback<MaterialTopTabNavigationEventMap & EventMapCore<TabNavigationState<ParamListBase>>, "tabLongPress", undefined>;
type MaterialTopTabSwipeStart = EventListenerCallback<MaterialTopTabNavigationEventMap & EventMapCore<TabNavigationState<ParamListBase>>, "swipeStart", undefined>;
type MaterialTopTabSwipeEnd = EventListenerCallback<MaterialTopTabNavigationEventMap & EventMapCore<TabNavigationState<ParamListBase>>, "swipeEnd", undefined>;

// ─── Events that already have canPreventDefault — no error ───────────────────

type CoreBeforeRemove = EventListenerCallback<NativeStackNavigationEventMap & EventMapCore<StackNavigationState<ParamListBase>>, "beforeRemove", true>;
type BottomTabTabPress = EventListenerCallback<BottomTabNavigationEventMap & EventMapCore<TabNavigationState<ParamListBase>>, "tabPress", true>;
type DrawerItemPress = EventListenerCallback<DrawerNavigationEventMap & EventMapCore<DrawerNavigationState<ParamListBase>>, "drawerItemPress", true>;
type MaterialTopTabTabPress = EventListenerCallback<MaterialTopTabNavigationEventMap & EventMapCore<TabNavigationState<ParamListBase>>, "tabPress", true>;

export type {
  CoreFocus, CoreBlur, CoreState,
  NativeStackTransitionStart, NativeStackTransitionEnd, NativeStackGestureCancel, NativeStackSheetDetentChange,
  BottomTabTabLongPress, BottomTabTransitionStart, BottomTabTransitionEnd,
  StackTransitionStart, StackTransitionEnd, StackGestureStart, StackGestureEnd, StackGestureCancel,
  DrawerTransitionStart, DrawerTransitionEnd, DrawerGestureStart, DrawerGestureEnd, DrawerGestureCancel,
  MaterialTopTabTabLongPress, MaterialTopTabSwipeStart, MaterialTopTabSwipeEnd,
  CoreBeforeRemove, BottomTabTabPress, DrawerItemPress, MaterialTopTabTabPress,
};
