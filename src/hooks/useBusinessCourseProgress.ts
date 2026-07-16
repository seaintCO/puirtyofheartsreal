"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { createClient } from "@/lib/supabase/client";
import { businessLessons } from "@/data/business-course";

export const BUSINESS_COURSE_ID = "purity-main";

type ProgressRow = {
  lesson_id: string;
  completed: boolean;
  last_viewed_at: string | null;
};

type NoteRow = {
  lesson_id: string;
  content: string;
};

type AssignmentRow = {
  lesson_id: string;
  content: string;
};

type QuizAnswers = Record<number, number>;

export function useBusinessCourseProgress() {
  const supabase = useMemo(
    () => createClient(),
    [],
  );

  const [userId, setUserId] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [completed, setCompleted] =
    useState<string[]>([]);

  const [notes, setNotes] =
    useState<Record<string, string>>({});

  const [assignments, setAssignments] =
    useState<Record<string, string>>({});

  const [lastLessonId, setLastLessonId] =
    useState(businessLessons[0]?.id ?? "");

  const [saving, setSaving] =
    useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);

    const {
      data: authData,
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error(
        "Unable to load current user:",
        authError,
      );

      setLoading(false);
      return;
    }

    const user = authData.user;

    if (!user) {
      setLoading(false);
      return;
    }

    setUserId(user.id);

    const [
      progressResult,
      notesResult,
      assignmentsResult,
    ] = await Promise.all([
      supabase
        .from("lesson_progress")
        .select(
          `
            lesson_id,
            completed,
            last_viewed_at
          `,
        )
        .eq("user_id", user.id)
        .eq(
          "course_id",
          BUSINESS_COURSE_ID,
        )
        .order(
          "last_viewed_at",
          {
            ascending: false,
            nullsFirst: false,
          },
        ),

      supabase
        .from("lesson_notes")
        .select(
          `
            lesson_id,
            content
          `,
        )
        .eq("user_id", user.id)
        .eq(
          "course_id",
          BUSINESS_COURSE_ID,
        ),

      supabase
        .from("assignment_submissions")
        .select(
          `
            lesson_id,
            content
          `,
        )
        .eq("user_id", user.id)
        .eq(
          "course_id",
          BUSINESS_COURSE_ID,
        ),
    ]);

    if (progressResult.error) {
      console.error(
        "Unable to load lesson progress:",
        progressResult.error,
      );
    }

    if (notesResult.error) {
      console.error(
        "Unable to load lesson notes:",
        notesResult.error,
      );
    }

    if (assignmentsResult.error) {
      console.error(
        "Unable to load assignments:",
        assignmentsResult.error,
      );
    }

    const progressRows =
      (progressResult.data ?? []) as ProgressRow[];

    const noteRows =
      (notesResult.data ?? []) as NoteRow[];

    const assignmentRows =
      (assignmentsResult.data ??
        []) as AssignmentRow[];

    setCompleted(
      progressRows
        .filter(
          (row) => row.completed,
        )
        .map(
          (row) => row.lesson_id,
        ),
    );

    setNotes(
      Object.fromEntries(
        noteRows.map(
          (row) => [
            row.lesson_id,
            row.content ?? "",
          ],
        ),
      ),
    );

    setAssignments(
      Object.fromEntries(
        assignmentRows.map(
          (row) => [
            row.lesson_id,
            row.content ?? "",
          ],
        ),
      ),
    );

    const latestValidRow =
      progressRows.find(
        (row) =>
          businessLessons.some(
            (lesson) =>
              lesson.id === row.lesson_id,
          ),
      );

    if (latestValidRow) {
      setLastLessonId(
        latestValidRow.lesson_id,
      );
    }

    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    void load();
  }, [load]);

  const touchLesson = useCallback(
    async (
      lessonId: string,
    ) => {
      setLastLessonId(lessonId);

      if (!userId) {
        return;
      }

      const {
        error,
      } = await supabase
        .from("lesson_progress")
        .upsert(
          {
            user_id: userId,
            course_id:
              BUSINESS_COURSE_ID,
            lesson_id: lessonId,
            last_viewed_at:
              new Date().toISOString(),
          },
          {
            onConflict:
              "user_id,course_id,lesson_id",
          },
        );

      if (error) {
        console.error(
          "Unable to update latest lesson:",
          error,
        );
      }
    },
    [
      supabase,
      userId,
    ],
  );

  const toggleComplete = useCallback(
    async (
      lessonId: string,
    ) => {
      if (!userId) {
        return false;
      }

      const isCurrentlyComplete =
        completed.includes(lessonId);

      const nextCompleted =
        !isCurrentlyComplete;

      setCompleted(
        (current) =>
          nextCompleted
            ? Array.from(
                new Set([
                  ...current,
                  lessonId,
                ]),
              )
            : current.filter(
                (id) =>
                  id !== lessonId,
              ),
      );

      setSaving(
        `progress:${lessonId}`,
      );

      const now =
        new Date().toISOString();

      const {
        error,
      } = await supabase
        .from("lesson_progress")
        .upsert(
          {
            user_id: userId,
            course_id:
              BUSINESS_COURSE_ID,
            lesson_id: lessonId,
            completed:
              nextCompleted,
            progress_percent:
              nextCompleted
                ? 100
                : 0,
            started_at: now,
            completed_at:
              nextCompleted
                ? now
                : null,
            last_viewed_at:
              now,
          },
          {
            onConflict:
              "user_id,course_id,lesson_id",
          },
        );

      if (error) {
        console.error(
          "Unable to save lesson progress:",
          error,
        );

        setCompleted(
          (current) =>
            nextCompleted
              ? current.filter(
                  (id) =>
                    id !== lessonId,
                )
              : Array.from(
                  new Set([
                    ...current,
                    lessonId,
                  ]),
                ),
        );
      }

      setSaving(null);

      return !error;
    },
    [
      completed,
      supabase,
      userId,
    ],
  );

  const updateNote =
    useCallback(
      (
        lessonId: string,
        content: string,
      ) => {
        setNotes(
          (current) => ({
            ...current,
            [lessonId]:
              content,
          }),
        );
      },
      [],
    );

  const saveNote = useCallback(
    async (
      lessonId: string,
    ) => {
      if (!userId) {
        return false;
      }

      setSaving(
        `note:${lessonId}`,
      );

      const {
        error,
      } = await supabase
        .from("lesson_notes")
        .upsert(
          {
            user_id: userId,
            course_id:
              BUSINESS_COURSE_ID,
            lesson_id: lessonId,
            content:
              notes[lessonId] ??
              "",
          },
          {
            onConflict:
              "user_id,course_id,lesson_id",
          },
        );

      if (error) {
        console.error(
          "Unable to save lesson note:",
          error,
        );
      }

      setSaving(null);

      return !error;
    },
    [
      notes,
      supabase,
      userId,
    ],
  );

  const updateAssignment =
    useCallback(
      (
        lessonId: string,
        content: string,
      ) => {
        setAssignments(
          (current) => ({
            ...current,
            [lessonId]:
              content,
          }),
        );
      },
      [],
    );

  const saveAssignment =
    useCallback(
      async (
        lessonId: string,
      ) => {
        if (!userId) {
          return false;
        }

        setSaving(
          `assignment:${lessonId}`,
        );

        const content =
          assignments[lessonId] ??
          "";

        const {
          error,
        } = await supabase
          .from(
            "assignment_submissions",
          )
          .upsert(
            {
              user_id: userId,
              course_id:
                BUSINESS_COURSE_ID,
              lesson_id:
                lessonId,
              content,
              status:
                content.trim()
                  ? "submitted"
                  : "draft",
              submitted_at:
                content.trim()
                  ? new Date()
                      .toISOString()
                  : null,
            },
            {
              onConflict:
                "user_id,course_id,lesson_id",
            },
          );

        if (error) {
          console.error(
            "Unable to save assignment:",
            error,
          );
        }

        setSaving(null);

        return !error;
      },
      [
        assignments,
        supabase,
        userId,
      ],
    );

  const saveQuizAttempt =
    useCallback(
      async (
        lessonId: string,
        answers: QuizAnswers,
        score: number,
        totalQuestions: number,
      ) => {
        if (!userId) {
          return false;
        }

        setSaving(
          `quiz:${lessonId}`,
        );

        const passed =
          totalQuestions > 0 &&
          score /
            totalQuestions >=
            0.7;

        const {
          error,
        } = await supabase
          .from("quiz_attempts")
          .insert({
            user_id: userId,
            course_id:
              BUSINESS_COURSE_ID,
            lesson_id:
              lessonId,
            quiz_id:
              `lesson-${lessonId}`,
            score,
            total_questions:
              totalQuestions,
            answers,
            passed,
            completed_at:
              new Date()
                .toISOString(),
          });

        if (error) {
          console.error(
            "Unable to save quiz attempt:",
            error,
          );
        }

        setSaving(null);

        return !error;
      },
      [
        supabase,
        userId,
      ],
    );

  const totalLessons =
    businessLessons.length;

  const completedCount =
    completed.length;

  const progressPercent =
    totalLessons > 0
      ? Math.round(
          completedCount /
            totalLessons *
            100,
        )
      : 0;

  const lastLesson =
    businessLessons.find(
      (lesson) =>
        lesson.id ===
        lastLessonId,
    ) ??
    businessLessons[0];

  return {
    userId,
    loading,
    saving,

    completed,
    completedCount,
    totalLessons,
    progressPercent,

    notes,
    assignments,

    lastLessonId,
    lastLesson,

    reload: load,
    touchLesson,
    toggleComplete,

    updateNote,
    saveNote,

    updateAssignment,
    saveAssignment,

    saveQuizAttempt,
  };
}
