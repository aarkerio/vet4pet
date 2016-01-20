import moment from "moment";
import DateUtil from "../../src/util/date";

describe("DateUtil", function() {
  describe("#isBefore", function() {
    it("returns true when the date is before the passed date", function() {
      var date = new DateUtil(moment("2014-02-08"));
      var otherDate = new DateUtil(moment("2014-02-09"));

      expect(date.isBefore(otherDate)).to.eq(true);
    });

    it("returns false when the date is after the passed date", function() {
      var date = new DateUtil(moment("2014-02-08"));
      var otherDate = new DateUtil(moment("2014-02-05"));

      expect(date.isBefore(otherDate)).to.eq(false);
    });

    it("returns false when the passed date is the same day", function() {
      var date = new DateUtil(moment("2014-02-08"));
      var otherDate = new DateUtil(moment("2014-02-08"));

      expect(date.isBefore(otherDate)).to.eq(false);
    });
  });

  describe("#isAfter", function() {
    it("returns true when the date is after the passed date", function() {
      var date = new DateUtil(moment("2014-02-09"));
      var otherDate = new DateUtil(moment("2014-02-08"));

      expect(date.isAfter(otherDate)).to.eq(true);
    });

    it("returns false when the date is before the passed date", function() {
      var date = new DateUtil(moment("2014-02-05"));
      var otherDate = new DateUtil(moment("2014-02-08"));

      expect(date.isAfter(otherDate)).to.eq(false);
    });

    it("returns false when the passed date is the same day", function() {
      var date = new DateUtil(moment("2014-02-08"));
      var otherDate = new DateUtil(moment("2014-02-08"));

      expect(date.isAfter(otherDate)).to.eq(false);
    });
  });

  describe("#sameDay", function() {
    it("returns true when the passed date is the same date", function() {
      var date = new DateUtil(moment("2014-02-08"));
      var otherDate = new DateUtil(moment("2014-02-08"));

      expect(date.sameDay(otherDate)).to.eq(true);
    });

    it("returns true when the passed date is within the same day", function() {
      var date = new DateUtil(moment("2014-02-08 03:30"));
      var otherDate = new DateUtil(moment("2014-02-08 09:30"));

      expect(date.sameDay(otherDate)).to.eq(true);
    });

    it("returns false when the passed date is not the same day", function() {
      var date = new DateUtil(moment("2014-02-08"));
      var otherDate = new DateUtil(moment("2014-02-09"));

      expect(date.sameDay(otherDate)).to.eq(false);
    });
  });

  describe("#sameMonth", function() {
    it("returns true when the passed date is the same date", function() {
      var date = new DateUtil(moment("2014-02-08"));
      var otherDate = new DateUtil(moment("2014-02-08"));

      expect(date.sameMonth(otherDate)).to.eq(true);
    });

    it("returns true when the passed date is within the same month", function() {
      var date = new DateUtil(moment("2014-02-08 03:30"));
      var otherDate = new DateUtil(moment("2014-02-10 09:30"));

      expect(date.sameMonth(otherDate)).to.eq(true);
    });

    it("returns false when the passed date is not the same day", function() {
      var date = new DateUtil(moment("2014-02-08"));
      var otherDate = new DateUtil(moment("2014-03-08"));

      expect(date.sameMonth(otherDate)).to.eq(false);
    });
  });

  describe("#inRange", function() {
    it("returns true when the date is in range the passed date", function() {
      var date = new DateUtil(moment("2014-02-09"));
      var startDate = new DateUtil(moment("2014-02-08"));
      var endDate = new DateUtil(moment("2014-02-10"));

      expect(date.inRange(startDate, endDate)).to.eq(true);
    });

    it("returns false when the date is not in range the passed date", function() {
      var date = new DateUtil(moment("2014-02-08"));
      var startDate = new DateUtil(moment("2014-02-09"));
      var endDate = new DateUtil(moment("2014-02-10"));

      expect(date.inRange(startDate, endDate)).to.eq(false);
    });

    it("returns true when the passed date is the same day as start of range", function() {
      var date = new DateUtil(moment("2014-02-09"));
      var startDate = new DateUtil(moment("2014-02-09"));
      var endDate = new DateUtil(moment("2014-02-10"));

      expect(date.inRange(startDate, endDate)).to.eq(true);
    });

    it("returns true when the passed date is the same day as end of range", function() {
      var date = new DateUtil(moment("2014-02-10"));
      var startDate = new DateUtil(moment("2014-02-09"));
      var endDate = new DateUtil(moment("2014-02-10"));

      expect(date.inRange(startDate, endDate)).to.eq(true);
    });

    it("returns false when the start of range is missing", function() {
      var date = new DateUtil(moment("2014-02-09"));
      var endDate = new DateUtil(moment("2014-02-10"));

      expect(date.inRange(null, endDate)).to.eq(false);
    });

    it("returns false when the end of range is missing", function() {
      var date = new DateUtil(moment("2014-02-09"));
      var startDate = new DateUtil(moment("2014-02-09"));

      expect(date.inRange(startDate, null)).to.eq(false);
    });

    it("does not modify the input dates", function() {
      var startDate = new DateUtil(moment("2014-02-09"));
      var endDate = new DateUtil(moment("2014-02-10"));
      var startDateClone = startDate.clone();
      var endDateClone = endDate.clone();
      var date = new DateUtil(moment("2014-02-09"));
      date.inRange(startDate, endDate);

      expect(startDate.moment().isSame(startDateClone.moment())).to.eq(true);
      expect(endDate.moment().isSame(endDateClone.moment())).to.eq(true);
    });
  });

  describe("#day", function() {
    it("returns the day of the month", function() {
      var date = new DateUtil(moment("2014-02-08"));

      expect(date.day()).to.eq(8);
    });
  });

  describe("#year", function() {
    it("returns the year", function() {
      var date = new DateUtil(moment("2014-02-08"));

      expect(date.year()).to.equal(2014);
    });
  });

  describe("#changeYear", function() {
    it("changes the year", function() {
      var expectedDate = moment("2020-02-08");
      var date = new DateUtil(moment("2014-02-08"));
      var newDate = date.changeYear("2020");

      expect(newDate._date.isSame(expectedDate)).to.be.true;
    });
  });

  describe("#mapDaysInWeek", function() {
    describe("calls the callback method for every day in the week", function() {
      var daysOfTheWeek = [
        "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
      ];

      it("when the date is a monday", function(done) {
        var date = new DateUtil(moment("2014-10-13"));
        var callbackCounter = 0;
        var callback = function(dayOfTheWeek) {
          expect(dayOfTheWeek.moment().format("ddd"))
            .to.eq(daysOfTheWeek[callbackCounter]);
          callbackCounter++;

          if (callbackCounter === 7) {
            done();
          }
        };

        date.mapDaysInWeek(callback);
      });

      it("when the date is a sunday", function(done) {
        var date = new DateUtil(moment("2014-10-20"));
        var callbackCounter = 0;
        var callback = function(dayOfTheWeek) {
          expect(dayOfTheWeek.moment().format("ddd"))
            .to.eq(daysOfTheWeek[callbackCounter]);
          callbackCounter++;

          if (callbackCounter === 7) {
            done();
          }
        };

        date.mapDaysInWeek(callback);
      });
    });
  });

  describe("#safeClone", function() {
    it("should return a cloned version of _date if date is a valid moment object", function() {
      var date = moment("2014-02-08");
      var clonedDate = new DateUtil(date).safeClone();

      expect(clonedDate._date).to.not.eq(date);
      expect(clonedDate._date._i).to.eq(date._i);
    });

    it("should return a null _date if original date is undefined and no alternative is provided", function() {
      var date = undefined;
      var clonedDate = new DateUtil(date).safeClone();

      expect(clonedDate._date).to.eq(null);
    });

    it("should return an alternative _date if original date is undefined and an alternative is provided", function() {
      var date = undefined;
      var alternative = moment();
      var clonedDate = new DateUtil(date).safeClone(alternative);

      expect(clonedDate._date).to.eq(alternative);
    });
  });
});
