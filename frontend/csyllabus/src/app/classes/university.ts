/**
 * University object explore courses
 * <p>
 * @author CSyllabus Team
 */
export class University {
  /**
   * The {@link Number} instance representing id.
   */
  id: Number;
  /**
   * The {@link Number} instance representing countryId.
   */
  countryId: Number;
  /**
   * The {@link Number} instance representing cityId.
   */
  cityId: Number;
  /**
   * The {@link string} instance representing name.
   */
  name: string;
  /**
   * The {@link string} instance representing img.
   */
  img: string;
  /**
   * The {@link String} instance representing created.
   */
  created: String;
  /**
   * The {@link String} instance representing modified.
   */
  modified: String;
  /**
   * The {@link Array<Object>} instance representing faculties.
   */
  faculties: Array<Object>;
  /**
   * The {@link Array<Object>} instance representing programs.
   */
  programs: Array<Object>;

  description: String;

  countryName: String;

  cityName: String;

  facultyName: String;
}


