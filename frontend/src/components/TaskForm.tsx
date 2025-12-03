/**
 * =============================================================================
 * TASK FORM COMPONENT
 * =============================================================================
 * 
 * Dynamically renders a form based on the questions array from a task config.
 * 
 * This component is the heart of the questionnaire system. It takes an array
 * of Question objects and renders the appropriate input type for each:
 * - text: Single-line text input
 * - textarea: Multi-line text input
 * - select: Dropdown with predefined options
 * - multiselect: Checkboxes for multiple selections
 * 
 * The form collects all answers into a single object and passes it to the
 * onSubmit callback when the user clicks "Generate Custom Plan".
 * 
 * Used in: LogoTask.tsx and other workflow pages
 * Data source: task.questions from the workflow config
 * 
 * @example
 * <TaskForm 
 *   questions={task.questions}
 *   onSubmit={(answers) => generatePlan('logo', answers)}
 *   isLoading={isGenerating}
 * />
 * =============================================================================
 */

import { useState, FormEvent } from 'react';
import type { Question } from '../types';

/**
 * Props for the TaskForm component
 */
interface TaskFormProps {
  /** Array of Question objects defining the form fields */
  questions: Question[];
  /** Callback fired when form is submitted with all answers */
  onSubmit: (answers: Record<string, any>) => void;
  /** When true, disables the submit button and shows loading state */
  isLoading?: boolean;
}

/**
 * TaskForm - Renders a dynamic form based on question configuration.
 * 
 * State Management:
 * - Uses a single `answers` object to store all form values
 * - Keys are question IDs, values are the user's input
 * - For multiselect, values are arrays of selected options
 * 
 * Form Validation:
 * - Uses HTML5 required attribute for basic validation
 * - Required fields are marked with a red asterisk (*)
 */
export default function TaskForm({ questions, onSubmit, isLoading }: TaskFormProps) {
  // Single state object holding all form answers
  // Structure: { questionId: value, ... }
  const [answers, setAnswers] = useState<Record<string, any>>({});

  /**
   * Handles form submission.
   * Prevents default form behavior and calls onSubmit with collected answers.
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(answers);
  };

  /**
   * Updates a single answer in the state.
   * Used by text, textarea, and select inputs.
   */
  const handleChange = (id: string, value: any) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  /**
   * Handles checkbox changes for multiselect questions.
   * Adds or removes the option from the array of selected values.
   */
  const handleMultiSelectChange = (id: string, option: string, checked: boolean) => {
    const current = answers[id] || [];
    const updated = checked 
      ? [...current, option]  // Add option if checked
      : current.filter((item: string) => item !== option);  // Remove if unchecked
    handleChange(id, updated);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Render each question based on its type */}
      {questions.map((question) => (
        <div key={question.id} className="space-y-2">
          {/* Question label with required indicator */}
          <label htmlFor={question.id} className="block font-medium">
            {question.label}
            {question.required && <span className="text-red-400 ml-1">*</span>}
          </label>

          {/* TEXT INPUT - Single line text entry */}
          {question.type === 'text' && (
            <input
              type="text"
              id={question.id}
              placeholder={question.placeholder}
              required={question.required}
              value={answers[question.id] || ''}
              onChange={(e) => handleChange(question.id, e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            />
          )}

          {/* TEXTAREA - Multi-line text entry for longer responses */}
          {question.type === 'textarea' && (
            <textarea
              id={question.id}
              placeholder={question.placeholder}
              required={question.required}
              value={answers[question.id] || ''}
              onChange={(e) => handleChange(question.id, e.target.value)}
              rows={4}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-y"
            />
          )}

          {/* SELECT - Dropdown for single choice from options */}
          {question.type === 'select' && (
            <select
              id={question.id}
              required={question.required}
              value={answers[question.id] || ''}
              onChange={(e) => handleChange(question.id, e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="">Select an option...</option>
              {question.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}

          {/* MULTISELECT - Checkboxes for multiple selections */}
          {question.type === 'multiselect' && (
            <div className="space-y-2">
              {question.options?.map((option) => (
                <label key={option} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(answers[question.id] || []).includes(option)}
                    onChange={(e) => handleMultiSelectChange(question.id, option, e.target.checked)}
                    className="w-4 h-4 bg-gray-800 border-gray-700 rounded"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          )}

          {/* Helper text for select/multiselect (placeholder shown differently) */}
          {question.placeholder && question.type !== 'text' && question.type !== 'textarea' && (
            <p className="text-xs text-gray-500">{question.placeholder}</p>
          )}
        </div>
      ))}

      {/* Submit button with loading state */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-700 disabled:to-gray-700 rounded-lg font-semibold transition-colors"
      >
        {isLoading ? 'Generating Plan...' : 'Generate Custom Plan'}
      </button>
    </form>
  );
}

