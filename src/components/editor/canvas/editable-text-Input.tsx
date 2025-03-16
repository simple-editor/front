import { useEffect, useRef, useState, useCallback } from "react";
import { Html } from "react-konva-utils";

interface IProps {
  style: {
    fontSize: number;
    width: number;
    height: number;
    textAlign?: "left" | "center" | "right";
    fontStyle?: "normal" | "bold" | "italic";
  };
  value: string;
  x: number;
  y: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onToggle: () => void;
  onPositionChange?: (x: number, y: number) => void;
}

const EditableTextInput = ({ style, ...props }: IProps) => {
  const { x, y, onChange, value, onToggle, onPositionChange } = props;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // 바깥 영역 클릭 감지를 위한 이벤트 리스너
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onToggle(); // 편집 모드만 종료
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onToggle]);

  const adjustTextareaHeight = useCallback(() => {
    const textarea = textAreaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.width = "auto";

    const contentWidth = Math.max(
      200,
      textarea.value ? textarea.value.length * style.fontSize * 1.2 : 200
    );

    const maxWidth = Math.min(contentWidth, window.innerWidth * 0.9);

    textarea.style.width = `${maxWidth}px`;
    const finalHeight = Math.max(50, textarea.scrollHeight);

    Object.assign(textarea.style, {
      width: `${maxWidth}px`,
      height: `${finalHeight}px`,
      fontSize: `${style.fontSize}px`,
      lineHeight: "1.5",
      whiteSpace: "pre-wrap",
      wordBreak: "keep-all",
      wordWrap: "break-word",
      background: "transparent",
      backgroundColor: "transparent",
    });

    if (containerRef.current) {
      containerRef.current.style.width = `${maxWidth + 16}px`;
      containerRef.current.style.height = `${finalHeight + 16}px`;
    }
  }, [style.fontSize]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target === textAreaRef.current) return;

      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      setDragStart({ x: e.clientX - x, y: e.clientY - y });
    },
    [x, y]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      e.preventDefault();
      e.stopPropagation();
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      containerRef.current.style.transform = `translate(${newX - x}px, ${
        newY - y
      }px)`;
    },
    [isDragging, dragStart, x, y]
  );

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;

      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      if (containerRef.current) {
        containerRef.current.style.transform = "none";
      }
      onPositionChange?.(newX, newY);
    },
    [isDragging, dragStart, onPositionChange]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e);
      requestAnimationFrame(adjustTextareaHeight);
    },
    [onChange, adjustTextareaHeight]
  );

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
      adjustTextareaHeight();
    }
  }, [value, adjustTextareaHeight]);

  return (
    <Html>
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          position: "absolute",
          top: y,
          left: x,
          cursor: isDragging ? "grabbing" : "move",
          padding: "4px",
          background: "transparent",
          borderRadius: "4px",
          display: "inline-block",
          maxWidth: "90vw",
          width: "auto",
          minWidth: "200px",
          userSelect: "none",
          touchAction: "none",
          zIndex: 1,
        }}
      >
        <textarea
          ref={textAreaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === "Escape") {
              e.preventDefault();
              onToggle();
              return;
            }
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onToggle();
              return;
            }
            requestAnimationFrame(adjustTextareaHeight);
          }}
          style={{
            width: "100%",
            minWidth: "200px",
            minHeight: "50px",
            fontSize: style.fontSize,
            fontFamily: "inherit",
            textAlign: style.textAlign || "left",
            fontStyle: style.fontStyle || "normal",
            fontWeight: "bold",
            padding: "8px",
            margin: 0,
            background: "transparent",
            backgroundColor: "transparent",
            backdropFilter: "none",
            WebkitBackdropFilter: "none",
            border: "2px dashed #666",
            borderRadius: "4px",
            outline: "none",
            resize: "none",
            zIndex: 1000,
            boxShadow: "none",
            caretColor: "#0096ff",
            lineHeight: "1.5",
            overflowY: "hidden",
            overflowX: "hidden",
            wordBreak: "keep-all",
            wordWrap: "break-word",
            whiteSpace: "pre-wrap",
            boxSizing: "border-box",
            cursor: "text",
            userSelect: "text",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -20,
            right: 0,
            fontSize: "12px",
            color: "rgba(0, 0, 0, 0.4)",
            pointerEvents: "none",
          }}
        >
          Enter to save • ESC to cancel
        </div>
      </div>
    </Html>
  );
};

export default EditableTextInput;
