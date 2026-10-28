"use client";

import { Component, ReactNode, ErrorInfo, useSyncExternalStore } from "react";

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class WebGLErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error?.message || "WebGL Error" };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn(
      "WebGL context unavailable or lost, rendered fallback successfully:",
      error?.message,
      errorInfo
    );
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext("experimental-webgl");
    if (!gl) return false;

    // Immediately release the probe context so it does not count towards the browser limit
    const loseContext = (gl as WebGLRenderingContext).getExtension("WEBGL_lose_context");
    if (loseContext) {
      loseContext.loseContext();
    }
    return true;
  } catch {
    return false;
  }
}

const emptySubscribe = () => () => {};

export function useHasWebGL(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => isWebGLAvailable(),
    () => false
  );
}
